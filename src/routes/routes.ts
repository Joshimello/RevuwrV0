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
    hidden: false
  },
  '/applications': {
    value: '/applications',
    label: 'Applications',
    icon: ListTodo,
    hidden: false
  },
  '/account': {
    value: '/account',
    label: 'Account',
    icon: Settings,
    hidden: false
  },
  '/admin': {
    value: '/admin',
    label: 'Admin',
    icon: PencilRuler,
    hidden: false
  }
}