import React, { useState } from "react";
import ContactCard from "../component/contact-card";
import ContactInfo from "../component/contact-info";
import ContactForm from "../component/contact-form";
import NavBar from "../component/navbar";
import SearchBar from "../component/SearchBar";
import "../style/contacts.css";
import axios from "axios";
import noImage from "../assets/no_image.jpg";
import useSWR from "swr";

// Default contact to send to ContactForm
const defaultContact = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};

function Contacts({ setAccessToken }) {
  const [selectedContact, setSelectedContact] = useState(null);
  const [showContactForm, setShowContactForm] = useState(null);
  const [filter, setFilter] = useState("");

  const fetchContacts = async (url) => {
    const response = await axios.get(url, {
      params: { filter: filter },
      withCredentials: true,
    });
    return response.data;
  };
  const { data, error, isLoading, mutate } = useSWR(
    "http://localhost:8000/contact",
    fetchContacts,
  );

  const cardClick = (contact) => {
    if (selectedContact === contact) {
      return;
    }
    setSelectedContact(contact);
  };

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  const handleSearchResults = (matches) => {
    setFilter(matches);
    mutate();
  };

  async function AddContact(contact, didSubmit) {
    if (!didSubmit) {
      toggleContactForm();
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/contact",
        contact,
        { withCredentials: true },
      );
      toggleContactForm();
      mutate();
      return response;
    } catch (error) {
      console.log(error);
      // Not handling errors at the moment
      toggleContactForm();
      return false;
    }
  }

  // Updates site when Editing and Deleting.
  function updateSite(contact) {
    mutate();
    setSelectedContact(contact);
  }

  return (
    <div className="contactpage">
      <NavBar setAccessToken={setAccessToken} />
      <div className="contactcontainer">
        <div className="contact-controls">
          <div className="search-bar">
            <SearchBar onSearchResults={handleSearchResults} />
          </div>

          <button className="addcontact" onClick={toggleContactForm}>
            Add Contact
          </button>
        </div>

        <div className="contactlist">
          {data &&
            data.map((contact, index) => (
              <div
                key={index}
                className="contactCard"
                onClick={() => cardClick(contact)}
              >
                <ContactCard
                  name={contact.firstName + " " + contact.lastName}
                  image={contact.image || noImage}
                />
              </div>
            ))}
        </div>
      </div>
      {selectedContact && (
        <div className={`contact-info ${selectedContact ? "active" : ""}`}>
          <ContactInfo
            contact={selectedContact}
            defaultContact={defaultContact}
            updateSite={updateSite}
          />
        </div>
      )}
      {showContactForm && (
        <div className="modal">
          <ContactForm handleSubmit={AddContact} contact={defaultContact} />
        </div>
      )}
    </div>
  );
}

export default Contacts;
