import { usePathname } from "next/navigation";

// retuns array of breadcrumb paths and display names
export default function useBreadcrumbs() {
  const pathname = usePathname();
  if (pathname === "/") return [];

  const breadcrumbs = [];
  let breadcrumbPath = "";

  let startInd = 0;
  while (startInd !== -1) {
    startInd += 1;
    const endInd = pathname.indexOf("/", startInd);
    const pathToken = pathname.slice(
      startInd,
      endInd === -1 ? pathname.length : endInd
    );
    breadcrumbPath += "/" + pathToken;
    const displayName = pathToken.replace(/\W/g, " ").replace(/\w\S*/g, str => {
      return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    });
    breadcrumbs.push({ path: breadcrumbPath, displayName });
    startInd = endInd;
  }

  return breadcrumbs;
}
