export default {
    root: 'src/',
    publicDir: '../public/',
    base: './',
    server:
    {
        host: true, // Open to local network and display URL
        port: 8084,
        // open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
        open: false // Disable automatic browser opening
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true // Add sourcemap
    },
}