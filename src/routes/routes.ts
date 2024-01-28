import {
  CalendarRange,
  ListTodo,
  Settings,
  PencilRuler,
  HelpCircle
} from "lucide-svelte"

export default {
  'empty': {
    value: '',
    label: '',
    icon: HelpCircle,
    hidden: true
  },
  '/events': {
    value: '/events',
    label: 'Events',
    icon: CalendarRange,
  },
  '/applications': {
    value: '/applications',
    label: 'Applications',
    icon: ListTodo,
  },
  '/account': {
    value: '/account',
    label: 'Account',
    icon: Settings,
  },
  '/admin': {
    value: '/admin',
    label: 'Admin',
    icon: PencilRuler,
    admin: true
  }
}