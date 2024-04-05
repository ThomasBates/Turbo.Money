import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths()
    ],

//    resolve: {
//        alias: [
//            {
//                find: 'app',
//                replacement: path.resolve(__dirname, 'src/app'),
//            },
//            {
//                find: 'components',
//                replacement: path.resolve(__dirname, 'src/components'),
//            },
//            {
//                find: 'data',
//                replacement: path.resolve(__dirname, 'src/data'),
//            },
//            {
//                find: 'pages',
//                replacement: path.resolve(__dirname, 'src/pages'),
//            },
//            {
//                find: 'services',
//                replacement: path.resolve(__dirname, 'src/services'),
//            },
//            {
//                find: 'setup',
//                replacement: path.resolve(__dirname, 'src/setup'),
//            },
//        ]
//    }
})
