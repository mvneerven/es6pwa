import { Topic } from "./mediator";

const initRouter = () => {
  window.addEventListener("popstate", (e) => {
    routerTopics.routeChanged.publish(
      {
        path: location.pathname,
        state: e.state,
        routeData: getRouteData(location.pathname),
      },
      "router"
    );
  });
  goTo(location.pathname);
};

function getRouteData(path: string) {
  const parts = path.split("/").filter((x) => x != "");
  const id = parseInt(parts[1]);
  return {
    page: parts[0] || "",
    id: isNaN(id) ? undefined : id,
  };
}

export interface IRoute {
  path: string;
  state: string;
  routeData: { page: string; id: number | undefined };
}

const goTo = (path: string | URL) => {
  const state = {};
  window.history.pushState(state, "", path);
  const e = new PopStateEvent("popstate", { state });
  window.dispatchEvent(e);
};

export const routerTopics = {
  initRouter: new Topic<undefined>("initRouter"),
  routeChanged: new Topic<IRoute>("routeChanged"),
  goTo: new Topic<string>("goTo"),
};

routerTopics.initRouter.subscribe(() => {
  initRouter();
}, "router");
routerTopics.goTo.subscribe((url) => {
  if (url) goTo(url);
}, "router");
