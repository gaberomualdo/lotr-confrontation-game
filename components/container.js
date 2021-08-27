export default function Container(props) {
  return (
    <div
      {...props}
      style={{
        ...{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: 'linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(/background.jpg)',
          minHeight: '100vh',
        },
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}
