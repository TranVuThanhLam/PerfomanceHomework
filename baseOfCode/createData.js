const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');
const { LoremIpsum } = require("lorem-ipsum");

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const csvWriter = createObjectCsvWriter({
  path: 'output.csv',
  header: [
    {id: 'id', title: 'ID'},
    {id: 'title', title: 'Title'},
    {id: 'content', title: 'Content'},
    {id: 'description', title: 'Description'},
  ]
});

function generateRandomData(numRecords) {
  const records = [];
  for (let i = 1; i <= numRecords; i++) { // Start from 1
    const title = lorem.generateWords(Math.floor(Math.random() * 5) + 3).substring(0, 99); // Limit title to 99 characters
    const content = lorem.generateSentences(Math.floor(Math.random() * 5) + 3).substring(0, 699); // Limit content to 699 characters
    let description = lorem.generateSentences(Math.floor(content.split('. ').length / 2) + 1).substring(0, 399); // Limit description to 399 characters
    if (description.length > content.length){
      description = content.substring(0, content.length/2)
    }
    records.push({ id: i, title, content, description }); // Add ID to each record
  }
  return records;
}


async function writeDataToCSV(numRecords) {
  try {
    const records = generateRandomData(numRecords)
    await csvWriter.writeRecords(records);
    console.log('CSV file written successfully');
  } catch (err) {
    console.error('Error writing CSV file:', err);
  }
}

// Tạo 20 nghìn dòng dữ liệu
writeDataToCSV(20000);