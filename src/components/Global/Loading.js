import "~/assets/css/loading.css";

const Loading = ({ loading }) => {
  return (
    <div className={`mask ${loading}`}>
      <div className="loader"></div>
      <span className="animate-charcter">Camel</span>
    </div>
  );
};

export default Loading;
