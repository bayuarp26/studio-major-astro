#!/bin/bash

# Script untuk push ke GitHub
# Ganti URL_REPOSITORY dengan URL GitHub repository Anda

echo "=== Studio Major Astro - GitHub Push Script ==="
echo ""

# Contoh URL yang perlu diganti:
# REPO_URL="https://github.com/USERNAME/studio-major-astro.git"

echo "Langkah-langkah:"
echo "1. Buat repository baru di GitHub dengan nama: studio-major-astro"
echo "2. Copy URL repository (format: https://github.com/USERNAME/studio-major-astro.git)"
echo "3. Jalankan command berikut:"
echo ""
echo "   git remote add origin YOUR_REPOSITORY_URL"
echo "   git push -u origin Research"
echo ""
echo "4. Untuk push branch master juga:"
echo "   git checkout master"
echo "   git push -u origin master"
echo ""

echo "Current git status:"
git status --short
echo ""
echo "Current branch:"
git branch
echo ""
echo "Ready to push!"
