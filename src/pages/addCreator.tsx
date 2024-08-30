import React, { useState } from "react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("creators")
      .insert([{ name, imageUrl, description, url }])
      .select();

    if (error) {
      console.error("Error adding creator:", error);
    } else {
      console.log("Creator added:", data);
      navigate("/creators");
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>Add Creator</h1>
        <Card className="max-w-lg w-full">
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                required
              />
              <Input
                label="Image URL"
                value={imageUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)}
                required
              />
              <Input
                label="Website or Social Media URL"
                value={url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                required
              />
              <Textarea
                label="Description"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                required
              />
              <Button type="submit" color="primary">
                Add Creator
              </Button>
            </form>
          </CardBody>
        </Card>
      </section>
    </DefaultLayout>
  );
}
