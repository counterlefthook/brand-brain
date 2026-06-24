import JSZip from 'jszip';
import { Answers, FileSection } from '../types';

export const generateMarkdownFiles = (answers: Answers, sections: FileSection[]) => {
  const zip = new JSZip();

  sections.forEach((section) => {
    let content = `<brand_context file="${section.fileName}">\n<metadata>\n  <title>${section.title}</title>\n  <type>Brand Context</type>\n</metadata>\n<content>\n\n`;
    content += `# ${section.title}\n\n`;
    content += `_${section.description}_\n\n`;

    section.questions.forEach((q) => {
      content += `## ${q.label}\n`;
      content += `${answers[q.id] || '*Not provided*'}\n\n`;
    });

    content += `</content>\n</brand_context>`;
    zip.file(section.fileName, content);
  });

  return zip;
};

export const downloadZip = async (answers: Answers, sections: FileSection[]) => {
  const zip = generateMarkdownFiles(answers, sections);
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Brand_Brain_Context.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
