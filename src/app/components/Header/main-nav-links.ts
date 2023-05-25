export interface NavLink {
  name: string;
  url: string;
  id: string;
  key: string;
}

export interface NavLinkNode {
  link: NavLink;
  nestedLinks?: NavLink[];
}

export const mainNavLinks: NavLinkNode[] = [
  {
    link: {
      name: "Home",
      url: "/",
      id: "nav-link-home",
      key: "9c592c9b-3578-4987-b684-0733ff646e44",
    },
  },
  {
    link: {
      name: "Tools",
      url: "/tools",
      id: "nav-link-tools",
      key: "01fce955-1ecb-4610-952d-f0f2a8865ad3",
    },
    nestedLinks: [
      {
        name: "70 Percent Rule",
        url: "/tools/70-percent-rule",
        id: "nav-link-tools-70-percent-rule",
        key: "f10187c3-d5b7-4371-8af4-ec40090548f0",
      },
    ],
  },
];

export const loginNavLink: NavLinkNode = {
  link: {
    name: "Login",
    url: "/login",
    id: "nav-link-login",
    key: "ea36bba2-ac89-4297-b4f1-5b9bc81e3075",
  },
};

export const signupNavLink: NavLinkNode = {
  link: {
    name: "Sign Up",
    url: "/signup",
    id: "nav-link-signup",
    key: "2d81362f-a88b-4c32-abc5-be822aea816b",
  },
};
