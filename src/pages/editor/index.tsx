import { PageContainer } from '@ant-design/pro-components';
import Editor, { loader } from '@monaco-editor/react';
import { Card, Segmented, Select, Space } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';

// Configure Monaco CDN
loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs',
  },
});

const useStyles = createStyles(({ token, css }) => ({
  toolbar: css`
    margin-bottom: ${token.margin}px;
    display: flex;
    align-items: center;
    gap: ${token.margin}px;
    flex-wrap: wrap;
  `,
  editor: css`
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
    overflow: hidden;
  `,
}));

type ThemeType = 'vs-light' | 'vs-dark';
type LanguageType = 'javascript' | 'typescript' | 'python' | 'html' | 'css' | 'json';

const LANGUAGE_OPTIONS: { value: LanguageType; label: string }[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
];

const DEFAULT_CODE: Record<LanguageType, string> = {
  javascript: `// Welcome to Monaco Editor
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));

// Try editing this code
const items = [1, 2, 3, 4, 5];
const doubled = items.map(x => x * 2);
console.log('Doubled:', doubled);
`,
  typescript: `// TypeScript Example
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

// Usage
fetchUser(1).then(user => {
  console.log(user.name);
}).catch(error => {
  console.error(error.message);
});
`,
  python: `# Python Example
import json
from typing import List, Dict

def process_data(items: List[Dict]) -> List[Dict]:
    """Process a list of items and return filtered results."""
    results = []
    for item in items:
        if item.get('active', False):
            item['processed'] = True
            results.append(item)
    return results

# Test the function
data = [
    {'id': 1, 'active': True},
    {'id': 2, 'active': False},
    {'id': 3, 'active': True},
]

output = process_data(data)
print(json.dumps(output, indent=2))
`,
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    .card {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1rem;
    }
    h1 { color: #1677ff; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello, World!</h1>
    <p>This is a sample HTML page.</p>
  </div>
</body>
</html>
`,
  css: `/* CSS Example */
:root {
  --primary-color: #1677ff;
  --text-color: #333;
  --bg-color: #f5f5f5;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  color: var(--text-color);
  background: var(--bg-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
}
`,
  json: `{
  "name": "my-app",
  "version": "1.0.0",
  "private": true,
  "description": "Enterprise application template",
  "scripts": {
    "start": "max dev",
    "build": "max build",
    "lint": "biome check --write"
  },
  "dependencies": {
    "react": "^19.0.0",
    "antd": "^6.0.0"
  }
}
`,
};

const MonacoEditorPage: React.FC = () => {
  const { styles } = useStyles();
  const [language, setLanguage] = useState<LanguageType>('javascript');
  const [theme, setTheme] = useState<ThemeType>('vs-light');
  const [code, setCode] = useState(DEFAULT_CODE.javascript);
  const [editorHeight, setEditorHeight] = useState(500);

  const handleLanguageChange = (value: LanguageType) => {
    setLanguage(value);
    setCode(DEFAULT_CODE[value]);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleThemeChange = (value: ThemeType) => {
    setTheme(value);
  };

  return (
    <PageContainer title="Monaco Editor">
      <Card>
        <div className={styles.toolbar}>
          <Space>
            <span>Language:</span>
            <Select
              value={language}
              onChange={handleLanguageChange}
              options={LANGUAGE_OPTIONS}
              style={{ width: 160 }}
            />
          </Space>
          <Space>
            <span>Theme:</span>
            <Segmented<ThemeType>
              value={theme}
              onChange={handleThemeChange}
              options={[
                { value: 'vs-light', label: 'Light' },
                { value: 'vs-dark', label: 'Dark' },
              ]}
            />
          </Space>
          <Space>
            <span>Height:</span>
            <Select
              value={editorHeight}
              onChange={setEditorHeight}
              options={[
                { value: 300, label: '300px' },
                { value: 500, label: '500px' },
                { value: 700, label: '700px' },
                { value: 900, label: '900px' },
              ]}
              style={{ width: 100 }}
            />
          </Space>
        </div>
        <div className={styles.editor}>
          <Editor
            height={editorHeight}
            language={language}
            theme={theme}
            value={code}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
              bracketPairColorization: { enabled: true },
            }}
          />
        </div>
      </Card>
    </PageContainer>
  );
};

export default MonacoEditorPage;
