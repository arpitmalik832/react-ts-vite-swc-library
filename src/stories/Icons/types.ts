export interface IconProps {
  name: string;
}

export interface SVGComponent {
  ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  src: string;
}
