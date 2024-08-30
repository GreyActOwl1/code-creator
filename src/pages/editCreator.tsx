import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Input, Textarea, Button, Card, CardBody } from "@nextui-org/react";
import { supabase } from "../supaBaseclient";

export default function EditCreator() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const [nameError, setNameError] = useState("");
  const [imageUrlError, setImageUrlError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching creator:", error);
      } else {
        setName(data.name);
        setImageUrl(data.imageUrl);
        setDescription(data.description);
        setUrl(data.url);
      }
    };

    fetchCreator();
  }, [id]);

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
    e.preventDefault();
    setFormMessage({ type: '', text: '' });
    setIsLoading(true);

    if (!name || !imageUrl || !url) {
      setFormMessage({ type: 'error', text: 'Please fill in all required fields' });
      setIsLoading(false);
      return;
    }

    const imageUrlError = validateUrl(imageUrl);
    const websiteUrlError = validateUrl(url);
    
    setImageUrlError(imageUrlError);
    setUrlError(websiteUrlError);

    if (nameError || imageUrlError || websiteUrlError) {
      setFormMessage({ type: 'error', text: 'Please correct the errors in the form' });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("creators")
        .update({ name, imageUrl, description, url })
        .eq("id", id);

      if (error) throw error;

      setFormMessage({ type: 'success', text: 'Creator updated successfully!' });
      setTimeout(() => navigate("/creators"), 2000);
    } catch (error) {
      console.error("Error updating creator:", error);
      setFormMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>Edit Creator</h1>
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
                Update Creator
              </Button>
            </form>
          </CardBody>
        </Card>
      </section>
    </DefaultLayout>
  );
}

