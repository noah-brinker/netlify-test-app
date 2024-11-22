import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [markdownInput, setMarkdownInput] = useState('');
  const [htmlOutput, setHtmlOutput] = useState('');

  const convertToHTML = () => {
    // Extract components from markdown
    const matches = markdownInput.match(/\[<img src='([^']+)'[^\]]+\]\(([^)]+)\)\s*##\s*\[([^\]]+)\]\([^)]+\)\s*([\s\S]+?)\{%\s*cta[^}]+\}\s*([^%]+?)\s*\{%\s*endcta\s*%\}/);
    
    if (matches) {
      const [_, imgSrc, url, title, description, ctaText] = matches;
      
      const htmlTemplate = `<tr>
  <td bgcolor="#FFFFFF">
    <div style="padding: 0px 3px 41px; font-size: 16px; color: #333;">
      <a href="${url}">
        <img src="${imgSrc}" style="border-radius: 12px;display:block;width:100%;height:100%;margin-bottom:20px;" height="260" width="620" alt="Advertisement"/>
      </a>
      <a href="${url}" style="text-decoration: none; color: #0a0a0a;">
        <h2 style="font-size: 20px; color: #0a0a0a; margin: 0 0 10px;">${title}</h2>
      </a>
      <p style="margin: 0 0 20px;">
${description}
</p>
      <a href="${url}" style="padding: 16px 30px; background-color: #0a0a0a; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold;">${ctaText}</a>
    </div>
  </td>
</tr>`;
      
      setHtmlOutput(htmlTemplate);
    } else {
      setHtmlOutput('Invalid markdown format');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Markdown to HTML Converter</title>
      </Head>

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Markdown to HTML Converter</h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left side - Markdown input */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Markdown Input
            </label>
            <textarea
              className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm"
              value={markdownInput}
              onChange={(e) => setMarkdownInput(e.target.value)}
              placeholder="Paste your markdown here..."
            />
          </div>

          {/* Middle - Convert button */}
          <div className="flex items-center justify-center px-4">
            <button
              onClick={convertToHTML}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Convert to HTML
            </button>
          </div>

          {/* Right side - HTML output */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              HTML Output
            </label>
            <textarea
              className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm"
              value={htmlOutput}
              readOnly
              placeholder="HTML will appear here..."
            />
          </div>
        </div>
      </main>
    </div>
  );
}
