// Data fetching and management for Astro
// Using MongoDB as primary data source

import clientPromise from './mongodb';
import type { PortfolioData, Project, EducationItem, Certificate, User, SoftwareSkill } from './types';

// Database configuration
const DB_NAME = 'portfolioDB';

// Collection names based on the actual database structure
const COLLECTIONS = {
  PROFILE: 'profil_settings',
  CONTENT: 'content',
  PROJECTS: 'projects',
  EDUCATION: 'education',
  CERTIFICATES: 'certificates',
  SOFT_SKILLS: 'soft_skills',
  HARD_SKILLS: 'hard_skills',
  SOFTWARE_SKILLS: 'software_skills'
};

// Helper function to safely access MongoDB
async function getDB() {
  if (!clientPromise) {
    throw new Error('MongoDB connection not available');
  }
  const client = await clientPromise;
  return client.db(DB_NAME);
}

// Get main portfolio data from database
export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const db = await getDB();
    
    // Get main profile data
    const profileData = await db.collection(COLLECTIONS.PROFILE).findOne({});
    
    // Get content data
    const contentData = await db.collection(COLLECTIONS.CONTENT).findOne({});
    
    // Get all related data in parallel
    const [
      projects,
      education,
      certificates,
      softSkillsDocs,
      hardSkillsDocs,
      softwareSkills
    ] = await Promise.all([
      db.collection(COLLECTIONS.PROJECTS).find({}).toArray(),
      db.collection(COLLECTIONS.EDUCATION).find({}).toArray(),
      db.collection(COLLECTIONS.CERTIFICATES).find({}).toArray(),
      db.collection(COLLECTIONS.SOFT_SKILLS).find({}).toArray(),
      db.collection(COLLECTIONS.HARD_SKILLS).find({}).toArray(),
      db.collection(COLLECTIONS.SOFTWARE_SKILLS).find({}).toArray()
    ]);

    // Extract skills as string arrays
    const softSkills = softSkillsDocs.map((doc: any) => doc.name || doc.skill || '').filter(Boolean);
    const hardSkills = hardSkillsDocs.map((doc: any) => doc.name || doc.skill || '').filter(Boolean);

    // Combine all data into PortfolioData structure
    const portfolioData: PortfolioData = {
      name: profileData?.name || contentData?.name || "Portfolio",
      title: {
        id: contentData?.title?.id || profileData?.title?.id || "Developer",
        en: contentData?.title?.en || profileData?.title?.en || "Developer"
      },
      about: {
        id: contentData?.about?.id || profileData?.about?.id || "Tentang saya",
        en: contentData?.about?.en || profileData?.about?.en || "About me"
      },
      cvUrl: profileData?.cvUrl || contentData?.cvUrl || "/cv.pdf",
      profilePictureUrl: profileData?.profilePictureUrl || contentData?.profilePictureUrl || "/profile.jpg",
      contact: {
        email: profileData?.contact?.email || contentData?.contact?.email || "contact@example.com",
        linkedin: profileData?.contact?.linkedin || contentData?.contact?.linkedin || ""
      },
      softSkills,
      hardSkills,
      softwareSkills: softwareSkills.map((skill: any) => ({
        name: skill.name || '',
        iconUrl: skill.iconUrl || skill.icon || ''
      })),
      projects: projects.map((project: any) => ({
        _id: project._id?.toString(),
        title: project.title || { id: project.name || '', en: project.name || '' },
        imageUrl: project.imageUrl || project.image || '',
        imageHint: project.imageHint || project.hint || '',
        description: project.description || { id: '', en: '' },
        details: project.details || project.detail || '',
        tags: Array.isArray(project.tags) ? project.tags : (project.technologies || []),
        link: project.link || project.url || ''
      })),
      education: education.map((edu: any) => ({
        _id: edu._id?.toString(),
        degree: edu.degree || { id: edu.title || '', en: edu.title || '' },
        school: edu.school || edu.institution || { id: '', en: '' },
        period: edu.period || edu.year || ''
      })),
      certificates: certificates.map((cert: any) => ({
        _id: cert._id?.toString(),
        name: cert.name || cert.title || { id: '', en: '' },
        description: cert.description || { id: '', en: '' },
        imageUrl: cert.imageUrl || cert.image || '',
        imageHint: cert.imageHint || cert.hint || '',
        issuer: cert.issuer || cert.organization || '',
        date: cert.date || cert.year || '',
        url: cert.url || cert.link || ''
      }))
    };

    return portfolioData;

  } catch (error) {
    console.error('Failed to fetch portfolio data from database:', error);
    throw new Error('Database connection failed. Please check your MongoDB connection.');
  }
}

// Get user data for authentication
export async function getUser(username: string): Promise<User | null> {
  try {
    const db = await getDB();
    const user = await db.collection(COLLECTIONS.PROFILE).findOne({ username });
    
    if (user) {
      return {
        username: user.username,
        password: user.password
      };
    }
    
    return null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

// Admin functions for managing data
export async function updateProfile(data: Partial<PortfolioData>): Promise<void> {
  try {
    const db = await getDB();
    
    // Update main profile/content data
    await db.collection(COLLECTIONS.CONTENT).updateOne(
      {},
      { $set: data },
      { upsert: true }
    );
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error;
  }
}

export async function addProject(project: Omit<Project, '_id'>): Promise<Project> {
  try {
    const db = await getDB();
    const result = await db.collection(COLLECTIONS.PROJECTS).insertOne(project);
    const newProject = await db.collection(COLLECTIONS.PROJECTS).findOne({ _id: result.insertedId });
    
    if (!newProject) {
      throw new Error('Failed to retrieve inserted project');
    }
    
    return {
      ...newProject,
      _id: newProject._id.toString()
    } as Project;
  } catch (error) {
    console.error('Failed to add project:', error);
    throw error;
  }
}

export async function updateProject(id: string, project: Partial<Project>): Promise<void> {
  try {
    const db = await getDB();
    const { ObjectId } = await import('mongodb');
    
    await db.collection(COLLECTIONS.PROJECTS).updateOne(
      { _id: new ObjectId(id) },
      { $set: project }
    );
  } catch (error) {
    console.error('Failed to update project:', error);
    throw error;
  }
}

export async function deleteProject(id: string): Promise<void> {
  try {
    const db = await getDB();
    const { ObjectId } = await import('mongodb');
    
    await db.collection(COLLECTIONS.PROJECTS).deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error('Failed to delete project:', error);
    throw error;
  }
}

// Similar functions for education and certificates
export async function addEducation(education: Omit<EducationItem, '_id'>): Promise<EducationItem> {
  try {
    const db = await getDB();
    const result = await db.collection(COLLECTIONS.EDUCATION).insertOne(education);
    const newEducation = await db.collection(COLLECTIONS.EDUCATION).findOne({ _id: result.insertedId });
    
    if (!newEducation) {
      throw new Error('Failed to retrieve inserted education');
    }
    
    return {
      ...newEducation,
      _id: newEducation._id.toString()
    } as EducationItem;
  } catch (error) {
    console.error('Failed to add education:', error);
    throw error;
  }
}

export async function addCertificate(certificate: Omit<Certificate, '_id'>): Promise<Certificate> {
  try {
    const db = await getDB();
    const result = await db.collection(COLLECTIONS.CERTIFICATES).insertOne(certificate);
    const newCertificate = await db.collection(COLLECTIONS.CERTIFICATES).findOne({ _id: result.insertedId });
    
    if (!newCertificate) {
      throw new Error('Failed to retrieve inserted certificate');
    }
    
    return {
      ...newCertificate,
      _id: newCertificate._id.toString()
    } as Certificate;
  } catch (error) {
    console.error('Failed to add certificate:', error);
    throw error;
  }
}

// Skills management
export async function addSoftSkill(skillName: string): Promise<void> {
  try {
    const db = await getDB();
    await db.collection(COLLECTIONS.SOFT_SKILLS).insertOne({ name: skillName });
  } catch (error) {
    console.error('Failed to add soft skill:', error);
    throw error;
  }
}

export async function addHardSkill(skillName: string): Promise<void> {
  try {
    const db = await getDB();
    await db.collection(COLLECTIONS.HARD_SKILLS).insertOne({ name: skillName });
  } catch (error) {
    console.error('Failed to add hard skill:', error);
    throw error;
  }
}

export async function addSoftwareSkill(skill: Omit<SoftwareSkill, '_id'>): Promise<void> {
  try {
    const db = await getDB();
    await db.collection(COLLECTIONS.SOFTWARE_SKILLS).insertOne(skill);
  } catch (error) {
    console.error('Failed to add software skill:', error);
    throw error;
  }
}

// Remove the getSamplePortfolioData function since we're using database only
// Export a fallback function for development/testing only
export function getEmptyPortfolioData(): PortfolioData {
  return {
    name: "Loading...",
    title: { id: "Loading...", en: "Loading..." },
    about: { id: "Loading...", en: "Loading..." },
    cvUrl: "",
    profilePictureUrl: "",
    contact: { email: "", linkedin: "" },
    softSkills: [],
    hardSkills: [],
    softwareSkills: [],
    projects: [],
    education: [],
    certificates: []
  };
}
