/**
 * In the following React template, create a simple form at the top that allows the user to enter in a first name, last name, and phone number and there should be a submit button. 
 * Once the submit button is pressed, the information should be displayed in a list below (automatically sorted by last name) along with all the previous information that was entered.
 * This way the application can function as a simple phone book. 
 * When your application loads, the input fields (not the phone book list) should be prepopulated with the following values already:
 * 
    First name = Coder
    Last name = Byte
    Phone = 8885559999
 * 
 */

import React, { useState } from "react";
import ReactDOM from "react-dom";

const style = {
  table: {
    borderCollapse: "collapse",
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px",
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px",
    },
    inputs: {
      marginBottom: "5px",
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "lightseagreen",
      fontSize: "14px",
      borderRadius: "5px",
    },
  },
} as const;

function PhoneBookForm({ addEntryToPhoneBook }) {
  const [prePopulatedData, setData] = useState({
    firstName: "Coder",
    lastName: "Byte",
    phone: 8885559999,
  });

  const submitFormData = () => {
    addEntryToPhoneBook(prePopulatedData);
  };

  const changeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prePopulatedData) => ({
      ...prePopulatedData,
      firstName: e.target.value,
    }));
  };

  const changeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prePopulatedData) => ({
      ...prePopulatedData,
      lastName: e.target.value,
    }));
  };

  const changePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prePopulatedData) => ({
      ...prePopulatedData,
      phone: Number(e.target.value),
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        submitFormData();
        e.preventDefault();
      }}
      style={style.form.container}
    >
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userFirstname"
        name="userFirstname"
        type="text"
        value={prePopulatedData.firstName}
        onChange={(e) => changeFirstName(e)}
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userLastname"
        name="userLastname"
        type="text"
        value={prePopulatedData.lastName}
        onChange={(e) => changeLastName(e)}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userPhone"
        name="userPhone"
        type="text"
        value={prePopulatedData.phone}
        onChange={(e) => changePhoneNumber(e)}
      />
      <br />
      <input
        style={style.form.submitBtn}
        className="submitButton"
        type="submit"
        value="Add User"
      />
    </form>
  );
}

function InformationTable(props: any) {
  /**
   * Remove empty Object fron phoneBookData props
   */
  const filteredPhoneBook = props.phoneBookData.filter((el: {}) => {
    if (Object.keys(el).length !== 0) {
      return true;
    }

    return false;
  });

  /**
   * Sorting By Last Name
   * Places uppercase letters before lowercase
   */
  filteredPhoneBook.sort(function (
    a: { lastName: String },
    b: { lastName: String }
  ) {
    if (a.lastName < b.lastName) {
      return -1;
    }
    if (a.lastName > b.lastName) {
      return 1;
    }
    return 0;
  });

  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {filteredPhoneBook.map(
          (
            phoneData: {
              lastName: String;
              firstName: String;
              phone: Number;
            },
            index: any
          ) => (
            <tr key={index}>
              <td style={style.tableCell}> {phoneData.firstName} </td>
              <td style={style.tableCell}> {phoneData.lastName} </td>
              <td style={style.tableCell}> {phoneData.phone} </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}

function Application(props) {
  const [phoneList, setPhoneList] = useState([{}]);

  const addEntryToPhoneBook = (data: []) => {
    setPhoneList((phoneList) => [...phoneList, data]);
  };

  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
      <InformationTable phoneBookData={phoneList} />
    </section>
  );
}

ReactDOM.render(<Application />, document.getElementById("test-03"));
