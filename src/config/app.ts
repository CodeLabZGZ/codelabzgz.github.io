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
    href: '/events',
    navigation: [
      {
        name: "ongoing"
      }, {
        name: "upcoming"
      }, {
        name: "joined"
      }, {
        name: "past"
      }
    ]
  }, { 
    name: 'teams',
    href: '/teams',
    navigation: [
      {
        name: "all teams"
      }, {
        name: "my teams"
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
    href: '#',
    name: 'My Teams',
    description: 'Manage my teams',
    icon: TbUsers,
  }, { 
    href: '#',
    name: 'Give Feedback',
    description: 'Help us improve the platform',
    icon: TbMessage,
  }, { 
    href: '#',
    name: 'Help',
    description: 'Access our documentation',
    icon: TbQuestionMark,
  }, { 
    href: '#',
    name: 'Support',
    description: 'Contact our support team',
    icon: TbLifebuoy,
  }
]