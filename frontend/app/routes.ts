import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
    // index("pages/Main.tsx"),
    route("main", "./pages/Main.tsx"),
    route("about", "./pages/About.tsx"),
    route("admin", "./pages/Admin.tsx")
] satisfies RouteConfig;