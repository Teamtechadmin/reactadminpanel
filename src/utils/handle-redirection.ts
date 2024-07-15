import { NextRouter } from "next/router";

export function handleCarRedirect(id: string, router: NextRouter) {
  const newTab = window.open(`/cars/${id}`, "_blank");
  if (newTab) {
    newTab.focus();
  } else {
    router.push(`/cars/${id}`);
  }
}

export const handleRedirection = (
  url: string,
  id: string,
  router: NextRouter,
) => {
  const newTab = window.open(`/${url}/${id}`, "_blank");
  if (newTab) {
    newTab.focus();
  } else {
    router.push(`/${url}/${id}`);
  }
};
