import { defineConfig } from 'vite'
import nunjucks, {Environment} from 'nunjucks'
import viteNunjucks from 'vite-plugin-nunjucks'
import { resolve } from "path";

const cwd = process.cwd();


const sidebarItems = require("./src/sidebar-items.json");
const horizontalMenuItems = require("./src/horizontal-menu-items.json");

export default defineConfig({
    root: resolve(cwd, "src"),
    plugins: [
        viteNunjucks({
            templatesDir: "/src",
            variables: { 
                '*': { 
                    web_title: "Mazer Admin Dashboard",
                    sidebarItems,
                    horizontalMenuItems,
                }
            },
            nunjucksConfigure: {
                watch: true,
                noCache: true,
                filters: {
                    containStr:  (str, containStr) => {
                        if (!str.length) return false;
                        return str.indexOf(containStr) >= 0;
                    },
                    startsWith:  (str, targetStr) => {
                        if (!str.length) return false;
                        return str.startsWith(targetStr);
                    } 
                }
            }
        }),
    ]
})