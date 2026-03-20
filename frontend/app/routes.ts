import { type RouteConfig, route, layout, index, prefix } from "@react-router/dev/routes";

export default [
    // index("src/pages/Main.tsx"),
    route("main", "./src/pages/Main.tsx"),
    route("about", "./src/pages/About.tsx"),
    route("admin", "./src/pages/Admin.tsx"),

    layout("./auth/layout.tsx", [
    route("login", "./auth/login.tsx"),
    route("register", "./auth/register.tsx"),
  
    ...prefix("concerts", [
    index("./concerts/home.tsx"),
    route(":city", "./concerts/city.tsx"),
    route("trending", "./concerts/trending.tsx"),
  ]),
]),

] satisfies RouteConfig;