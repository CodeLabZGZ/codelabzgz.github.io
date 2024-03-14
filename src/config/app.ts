import {
  TbLifebuoy,
  TbMessage,
  TbQuestionMark,
  TbUser,
  TbUsers
} from "react-icons/tb";

export const navigation = [
  { 
    name: 'events',
    href: '/events/live',
    navigation: [
      {
        name: "ongoing",
        href: "/events/live"
      }, {
        name: "upcoming",
        href: "/events/upcoming"
      }, {
        name: "joined",
        href: "/events/joined"
      }, {
        name: "past",
        href: "/events/past"
      }
    ]
  }, { 
    name: 'teams',
    href: '/teams/all',
    navigation: [
      {
        name: "all teams",
        href: "/teams/all"
      }, {
        name: "my teams",
        href: "/teams/my-teams"
      }
    ]
  },
]

export const userNavigation = [
  { 
    href: '#',
    name: 'My Profile',
    description: 'Manage my profile',
    icon: TbUser,
  }, { 
    href: '/teams/my-teams',
    name: 'My Teams',
    description: 'Manage my teams',
    icon: TbUsers,
  }, { 
    href: 'mailto:codelabzgz@unizar.es',
    name: 'Give Feedback',
    description: 'Help us improve the platform',
    icon: TbMessage,
  }, { 
    href: 'https://github.com/orgs/CodeLabZGZ/discussions/categories/q-a',
    name: 'Help',
    description: 'Access our documentation',
    icon: TbQuestionMark,
  }, { 
    href: 'https://discord.gg/QHe9YYDtGf',
    name: 'Support',
    description: 'Contact our support team',
    icon: TbLifebuoy,
  }
]