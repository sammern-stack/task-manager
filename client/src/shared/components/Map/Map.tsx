interface MapProps<T> {
  data: T[];
  render: (item: T) => React.JSX.Element;
}

export const Map = <T,>({ data, render }: MapProps<T>) => {
  return data.map(render);
};
