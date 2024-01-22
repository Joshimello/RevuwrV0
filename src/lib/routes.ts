import {
  CalendarRange,
  ListTodo,
  Settings,
  PencilRuler,
  Home
} from "lucide-svelte"

export default {
  '': {
    value: '/',
    label: 'Home',
    icon: Home,
    hidden: true
  },
  'events': {
    value: 'events',
    label: 'Events',
    icon: CalendarRange,
    hidden: false
  },
  'applications': {
    value: 'applications',
    label: 'Applications',
    icon: ListTodo,
    hidden: false
  },
  'account': {
    value: 'account',
    label: 'Account',
    icon: Settings,
    hidden: false
  },
  'admin': {
    value: 'admin',
    label: 'Admin',
    icon: PencilRuler
  }
}