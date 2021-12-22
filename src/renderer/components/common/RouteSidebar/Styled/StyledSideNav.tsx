import styled from 'styled-components';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// SideNav
const StyledSideNav = styled(SideNav)`
  background-color: ${(p: { backgroundColor: string }) => p.backgroundColor};
  border-right: 1px solid ${(p: { borderColor: string }) => p.borderColor};
`;
StyledSideNav.defaultProps = SideNav.defaultProps;

// Toggle
const StyledToggle = styled(Toggle)`
  background-color: ${(p: { backgroundColor: string }) => p.backgroundColor};
`;
StyledToggle.defaultProps = Toggle.defaultProps;

// Nav
const StyledNav = styled(Nav)`
  background-color: #fff;
  &&[class*='expanded--'] {
    [class*='sidenav-subnav--'] {
      > [class*='sidenav-subnavitem--'],
      > [class*='sidenav-subnavitem--']:hover {
        > [class*='navitem--'] {
          color: #222;
        }
      }
      > [class*='sidenav-subnavitem--']:hover {
        > [class*='navitem--'] {
          background-color: #eee;
        }
      }
      > [class*='sidenav-subnavitem--'][class*='selected--'] {
        > [class*='navitem--'] {
          color: ${(p: { backgroundColor: string }) => p.backgroundColor};
        }
        > [class*='navitem--']::before {
          border-left: 2px solid ${(p: { backgroundColor: string }) => p.backgroundColor};
        }
      }
    }
  }
  && > [class*='sidenav-navitem--'] {
    > [class*='navitem--'] {
      background-color: inherit;
      color: #222;
    }
  }
  && > [class*='sidenav-navitem--']:hover {
    > [class*='navitem--'] {
      background-color: #eee;
    }
  }
  && > [class*='sidenav-navitem--'],
  && > [class*='sidenav-navitem--']:hover {
    > [class*='navitem--'] {
      [class*='navicon--'] {
        &,
        > * {
          color: #666;
        }
      }
      [class*='sidenav-nav-text--'] {
        &,
        > * {
          color: #222;
        }
      }
    }
  }
  && > [class*='sidenav-navitem--'][class*='highlighted--'],
  && > [class*='sidenav-navitem--'][class*='highlighted--']:hover {
    > [class*='navitem--'] {
      [class*='navicon--'],
      [class*='navtext--'] {
        &,
        > * {
          color: ${(p: { backgroundColor: string }) => p.backgroundColor};
        }
      }
      [class*='sidenav-nav-text--'] {
        font-weight: 700;
      }
    }
  }
`;
StyledNav.defaultProps = Nav.defaultProps;

// NavItem
const StyledNavItem = styled(NavItem)`
  &&&:hover {
    [class*='navtext--'] {
      color: #222;
    }
  }
`;
StyledNavItem.defaultProps = NavItem.defaultProps;

// NavIcon
const StyledNavIcon = styled(NavIcon)`
  color: #222;
`;
StyledNavIcon.defaultProps = NavIcon.defaultProps;

// NavText
const StyledNavText = styled(NavText)`
  color: #222;
`;
StyledNavText.defaultProps = NavText.defaultProps;

export {
  StyledToggle as Toggle,
  StyledNav as Nav,
  StyledNavItem as NavItem,
  StyledNavIcon as NavIcon,
  StyledNavText as NavText
};
export default StyledSideNav;
