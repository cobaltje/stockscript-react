import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";

export default function Login() {
  return (
    <div className="bg-zinc-950 h-screen flex items-stretch ">
      <Card className="max-w-[400px] place-self-center justify-self-center ">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">StockScript React</p>
            <p className="text-small text-default-500">Login</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button variant="shadow" color="primary">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
