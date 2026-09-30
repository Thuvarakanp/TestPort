import { useReveal } from '../hooks.js';

export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`${className} reveal`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
