/** @type {import('next').NextConfig} */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  distDir: './dist',
  assetPrefix: undefined,
  basePath: '',
  images: {
    disableStaticImages: true,
    unoptimized: true,
    domains: [],
    path: '',
  },
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.(ttf|otf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: 'fonts',
              outputPath: 'fonts',
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
              outputPath: '/',
              name: (file) => {
                // Preserve original directory structure relative to public folder
                const relativePath = path.relative(
                  path.resolve(__dirname, 'public'),
                  path.dirname(file)
                );
                console.log(relativePath);
                // Generate unique filename with hash
                return `${relativePath}/[name].[ext]`;
              },
              esModule: false,
            },
          },
        ],
      },
      // {
      //   test: /\.(png|svg)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         publicPath: 'images',
      //         outputPath: 'images',
      //         name: '[name].[ext]',
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(mp3|wav|ogg|m4a)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: 'sounds',
              outputPath: 'sounds',
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-inline-loader',
            options: {},
          },
        ],
      }
    );
    return config;
  },
};

export default nextConfig;
