import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Input, Textarea, Button, Card, CardBody } from "@nextui-org/react";
import { supabase } from "../supaBaseclient";

export default function AddCreator() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const [nameError, setNameError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const validateName = (value: string) => {
    if (value.length < 2) {
      setNameError("Name must be at least 2 characters long");
    } else {
      setNameError("");
    }
  };

  const validateUrl = useCallback((value: string) => {
    const urlPattern = /^(https?:\/\/)?(www\.)?[a-z0-9-]+(\.[a-z]{2,})+([\/\w \.-]*)*\/?$/i;
    if (value && !urlPattern.test(value)) {
      return "Please enter a valid URL";
    }
    return "";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handling submit");
    e.preventDefault();
    setFormMessage({ type: '', text: '' });
    setIsLoading(true);

    if (!name || !imageUrl || !url) {
      setFormMessage({ type: 'error', text: 'Please fill in all required fields' });
      console.log(formMessage);
      setIsLoading(false);
      return;
    }

    const imageUrlError = validateUrl(imageUrl);
    const websiteUrlError = validateUrl(url);
    
    setImageUrlError(imageUrlError);
    setUrlError(websiteUrlError);

    if (nameError || imageUrlError || websiteUrlError) {
      setFormMessage({ type: 'error', text: 'Please correct the errors in the form' });
      console.log(formMessage);
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("creators")
        .insert([{ name, imageUrl, description, url }]);

      if (error) throw error;

      // Show success message before navigating
      setFormMessage({ type: 'success', text: 'Creator added successfully!' });
      setTimeout(() => navigate("/creators"), 2000);
      console.log(formMessage);
    } catch (error) {
      console.error("Error adding creator:", error);
      setFormMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>Add Creator</h1>
        {/* {formMessage.text && (
          <Card className="max-w-lg w-full bg-danger-50">
            <CardBody>
              <p className="text-danger text-center">{formMessage.text}</p>
            </CardBody>
          </Card>
        )} */}
        <Card className="max-w-lg w-full">
          <CardBody>
            {formMessage.text && (
              <Card className={`max-w-lg w-full ${formMessage.type === 'error' ? 'bg-danger-50' : 'bg-success-50'}`}>
                <CardBody>
                  <p className="text-center">{formMessage.text}</p>
                </CardBody>
              </Card>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <Input
                label="Name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                  validateName(e.target.value);
                }}
                required
                errorMessage={nameError}
                isInvalid={!!nameError}
              />
              <Input
                label="Image URL"
                value={imageUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setImageUrl(e.target.value);
                  setImageUrlError(validateUrl(e.target.value));
                }}
                required
                errorMessage={imageUrlError}
                isInvalid={!!imageUrlError}
              />
              <Input
                label="Website or Social Media URL"
                value={url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUrl(e.target.value);
                  setUrlError(validateUrl(e.target.value));
                }}
                required
                errorMessage={urlError}
                isInvalid={!!urlError}
              />
              <Textarea
                label="Description"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
              />
              <Button type="submit" color="primary" isLoading={isLoading}>
                Add Creator
              </Button>
            </form>
          </CardBody>
        </Card>
      </section>
    </DefaultLayout>
  );
}
