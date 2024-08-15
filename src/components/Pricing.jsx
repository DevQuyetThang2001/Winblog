// eslint-disable-next-line no-unused-vars
import React from "react";

const Pricing = () => {
  return (
    <main className="my-5">
      <div className="container">
        <section className="text-center">
          <h1 className="text-center my-3">
            Pricing
          </h1>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card">
                <div className="card-header bg-white py-3">
                  <p className="text-uppercase small mb-2">
                    <strong>Free</strong>
                  </p>
                  <h5 className="mb-0">Free</h5>
                </div>

                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Feature</li>
                    <li className="list-group-item">Feature</li>
                    <li className="list-group-item">Feature</li>
                  </ul>
                </div>

                <div className="card-footer bg-white py-3">
                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    data-mdb-ripple-init
                  >
                    Get it
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card border border-primary">
                <div className="card-header bg-white py-3">
                  <p className="text-uppercase small mb-2">
                    <strong>Essential</strong>
                  </p>
                  <h5 className="mb-0">$19/month</h5>
                </div>

                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Feature</li>
                    <li className="list-group-item">Feature</li>
                    <li className="list-group-item">Feature</li>
                    <li className="list-group-item">Feature</li>
                  </ul>
                </div>

                <div className="card-footer bg-white py-3">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    data-mdb-ripple-init
                  >
                    Buy now
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card">
                <div className="card-header bg-white py-3">
                  <p className="text-uppercase small mb-2">
                    <strong>Advanced</strong>
                  </p>
                  <h5 className="mb-0">$49/month</h5>
                </div>

                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Feature</li>
                    <li className="list-group-item">Feature</li>
                    <li className="list-group-item">Feature</li>
                    <li className="list-group-item">Feature</li>
                    <li className="list-group-item">Feature</li>
                  </ul>
                </div>

                <div className="card-footer bg-white py-3">
                  <button
                    type="button"
                    className="btn btn-info btn-sm"
                    data-mdb-ripple-init
                  >
                    Buy now
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card">
                <div className="card-header bg-white py-3">
                  <p className="text-uppercase small mb-2">
                    <strong>Enterprise</strong>
                  </p>
                  <h5 className="mb-0">$189/month</h5>
                </div>

                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Feature</li>
                    <li className="list-group-item">Feature</li>
                    <li className="list-group-item">Feature</li>
                    <li className="list-group-item">Feature</li>
                    <li className="list-group-item">Feature</li>
                    <li className="list-group-item">Feature</li>
                  </ul>
                </div>

                <div className="card-footer bg-white py-3">
                  <button
                    type="button"
                    className="btn btn-info btn-sm"
                    data-mdb-ripple-init
                  >
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Pricing;
