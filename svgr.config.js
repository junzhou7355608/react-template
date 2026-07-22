import path from 'path';

const template = ({ componentName, jsx }, { tpl }) => {
  return tpl`
    import type { IconComponentProps } from "../types";

    const ${componentName} = ({ size = 18, color = "currentColor", stroke = 2, ...props }: IconComponentProps) => ${jsx};

    export default ${componentName};
  `;
};

const toPascalCase = (str) =>
  str.replace(/(^\w|[-_/]\w)/g, (match) =>
    match.replace(/[-_/]/, '').toUpperCase(),
  );

const indexTemplate = (files) => {
  const exportEntries = files.map((file) => {
    // Extract the file name without its extension
    const fileName = path.basename(file.path, path.extname(file.path));

    // Convert the file name to PascalCase
    const componentName = toPascalCase(fileName);

    // Generate the export statement
    return `export { default as ${componentName} } from './${fileName}';`;
  });

  return `export type { IconComponentProps } from '../types';\n${exportEntries.join('\n')}`;
};

/**
 * @typedef {import('@svgr/core').Config} SVGRConfig
 */

/** @type {SVGRConfig} */
const config = {
  template,
  indexTemplate,
  svgProps: {
    width: '{size}',
    height: '{size}',
    color: '{color}',
    strokeWidth: '{stroke}',
  },
  svgoConfig: {
    plugins: [
      {
        name: 'removeViewBox',
        active: false,
      },
    ],
  },
  icon: true,
  typescript: true,
  filenameCase: 'kebab',
};

export default config;
