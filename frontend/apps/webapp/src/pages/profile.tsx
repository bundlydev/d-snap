import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { AuthButton, useActor } from "ic-react";

import Layout from "@app/components/layout";
import { Button } from "@app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";
import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import { useProfile } from "@app/hooks/useProfile";
import { useAuthGuard } from "@app/hooks/useRouterGuard";
import { storage } from "@app/lib/firebase";

import { Actors } from "../canisters";

const ProfilePage = () => {
  useAuthGuard({ isPrivate: true });

  const profile = useProfile();

  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      username: profile?.username,
      bio: profile?.bio,
    },
  });
  const user = useActor<Actors>("user");

  useEffect(() => {
    if (profile?.picture?.url) {
      setImgUrl(profile?.picture?.url);
    }
  }, [profile]);

  const handleSubmitProfilePicture = (e: any) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `dsnap-web/profile/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgressPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-lg p-4">
          <CardHeader>
            <CardTitle>Profile Customization</CardTitle>
            <CardDescription>Modify your account settings.</CardDescription>
          </CardHeader>
          <CardContent className="my-2">
            {}
            <form onSubmit={handleSubmitProfilePicture} className="form">
              {!imgUrl && progressPercent > 0 && (
                <div className="outerbar">
                  <div className="innerbar" style={{ width: `${progressPercent}%` }}>
                    {progressPercent}%
                  </div>
                </div>
              )}

              <div className="">
                {imgUrl && (
                  <img
                    className="my-2 rounded-full m-auto"
                    height="100"
                    width="100"
                    src={imgUrl}
                    alt="uploaded avatar"
                    style={{
                      aspectRatio: "100/100",
                      objectFit: "cover",
                    }}
                  />
                )}
                {!imgUrl && (
                  <img
                    alt="uploaded avatar"
                    className="my-2 rounded-full m-auto"
                    height="100"
                    width="100"
                    src="https://placehold.it/100x100"
                    style={{
                      aspectRatio: "100/100",
                      objectFit: "cover",
                    }}
                  />
                )}
                <Label htmlFor="profile-picture">Profile Picture</Label>
                <Input accept="image/*" className="block mt-1 w-full" id="profile-picture" type="file" />
                <Button type="submit" className="mt-4 ml-auto bg-purple-600">
                  Upload Image
                </Button>
              </div>
            </form>
            <form name="user-profile">
              <div className="space-y-2 mt-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder={"Type your desired username"}
                  value={watch("username") || ""}
                  {...register("username", { required: true })}
                />
              </div>
              <div className="space-y-2 mt-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  placeholder={"Write something about you"}
                  type="text"
                  value={watch("bio") || ""}
                  {...register("bio", { required: true })}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              disabled={loading}
              onClick={handleSubmit(async (data) => {
                setLoading(true);
                try {
                  await user.create({
                    bio: data.bio || "",
                    username: data.username || "",
                    picture: {
                      url: imgUrl || "",
                    },
                  });
                } catch (error) {
                  console.log(error);
                }
                setLoading(false);
              })}
              type="submit"
              form="user-profile"
              className="mt-4 ml-auto bg-purple-600">
              Save
            </Button>

            <div className="flex items-center justify-end w-16 mt-4">
              <AuthButton />
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;
