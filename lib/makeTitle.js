import config from './config';

export default function makeTitle(title) {
  if (title.length === 0) return config.name;
  return `${title} • ${config.name}`;
}
