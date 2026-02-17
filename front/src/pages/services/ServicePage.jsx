import React from "react";
import { useParams, Link } from "react-router-dom";
import { serviceTopics } from "../../data/serviceTopics.jsx";
import { BsArrowLeft } from "react-icons/bs";

const ServicePage = () => {
  const { slug } = useParams();
  const item = serviceTopics.find((s) => s.slug === slug);

  if (!item) {
    return (
      <div className="container py-5">
        <h2>Service not found</h2>
        <p>The service you are looking for does not exist.</p>
        <Link to="/coverage">Go back to services</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Link to="/coverage" className="mb-3 d-inline-block">
        <BsArrowLeft /> Back to services
      </Link>
      <div className="text-center">
        <div className="service-icon mb-3">{item.icon}</div>
        <h2>{item.title}</h2>
        <p className="lead">{item.desc}</p>
      </div>
      {/* add additional static information here if required */}
      <div className="mt-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
          euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
          purus auctor massa, nec semper lorem quam in massa.
        </p>
      </div>
    </div>
  );
};

export default ServicePage;
