import { topics } from "./mediator";

function getRouteData(path: string) {
  const parts = path.split("/").filter((x) => x != "");
  const id = parseInt(parts[1]);
  return {
    page: parts[0] || "",
    id: isNaN(id) ? undefined : id,
  };
}

export const initRouter = () => {
  window.addEventListener("popstate", (e) => {
    topics.routeChanged.publish({
      path: location.pathname,
      state: e.state,
      routeData: getRouteData(location.pathname),
    });
  });
  goTo(location.pathname);
};

export interface IRoute {
  path: string;
  state: string;
  routeData: { page: string; id: number | undefined };
}

export const goTo = (path: string | URL) => {
  const state = {};
  window.history.pushState(state, "", path);
  const e = new PopStateEvent("popstate", { state });
  window.dispatchEvent(e);
};
