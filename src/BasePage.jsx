import React from "react";

import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

export function BasePage({ user }) {
    return (
        <Card className="max-w-[400px] width-[200px] p-6">
            <CardHeader className="flex gap-3">
                <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src={user.avatarUrl ? user.avatarUrl : "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"}
                    width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md">{user.name}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="flex flex-col">
                    <span>Last Updated: {new Date(user.updatedAt).toLocaleString()}</span>
                    <span>Last Updated: {new Date(user.updatedAt).toLocaleString()}</span>
                </div>
            </CardBody>
            <Divider />
            <CardFooter>
                <Link
                    isExternal
                    showAnchorIcon
                    href={`https://RabbitHole/user/${user.googleId}`}
                >
                    Visit your profile
                </Link>
            </CardFooter>
        </Card>
    );
}