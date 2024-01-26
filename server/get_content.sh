#!/bin/bash

rootPath="F:/Study/LP ISIL/Web/MiniProject/github/server"
outputFilePath="all_information.txt"

find "$rootPath" -type f -name "*.java" -print | while IFS= read -r filePath; do
    relativePath=$(realpath --relative-to="$rootPath" "$filePath")
    fullRepositoryPath="$rootPath/$relativePath"
    
    echo "File Name: $(basename "$filePath")"
    echo "Repository Path: $fullRepositoryPath"
    echo "Contents:"
    cat "$filePath"
    echo "-----------------------------------------------"
done > "$outputFilePath"
