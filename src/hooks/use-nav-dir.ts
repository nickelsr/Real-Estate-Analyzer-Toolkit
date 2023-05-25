import { usePathname } from "next/navigation";

// retun current articles top level nav directory
export default function useNavDir() {
  const pathname = usePathname();
  if (pathname === "/") return undefined;

  const startInd = 1;
  const endInd = pathname.indexOf("/", startInd + 1);

  return pathname.slice(startInd, endInd === -1 ? pathname.length : endInd);
}
