import React from "react";

const Table = () => {
  return (
    <div>
      {
        <table className="table table-bordered">
          <thead>
            <tr className="text-lg">
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Source Link</th>
            </tr>
          </thead>
          <tbody>
            {article.map((item, index) => (
              <tr key={index} className="text-lg">
                <td>
                  <img
                    width={60}
                    height={100}
                    className="object-cover"
                    src={item?.articleImage}
                    alt=""
                  />
                </td>
                <td>{item?.title}</td>
                <td>{item?.description}</td>
                <td>{item?.sourceLink}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default Table;
