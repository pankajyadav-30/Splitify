import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FEATURES, STEPS, TESTIMONIALS } from "@/lib/landing";
// import { FEATURES, STEPS, TESTIMONIALS } from "@/lib/landing";

export default function Home() {
  return (
     <div className="flex flex-col pt-14">
      <section className="mt-20 pb-12 space-y-10 md:space-y-20 px-5"> 
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <Badge variant="outline" className="bg-violet-200 text-red-600">
            Simplify sharing. Amplify living.</Badge>
            <h1 className="gradient-title mx-auto max-w-4xl font-bold md:text-7xl">
              Split bills like a pro,not like roommates
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
               Keep the fun, ditch the fuss. Split bills fairly and 
               settle debts fast—so you can focus on what matters.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-700"
            >
              <Link href="/dashboard">
                Let’s Go
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

              <Button
              asChild
              size="lg"
              className="border-violet-600 text-red-600 hover:bg-violet-50"
            >
              <Link href="#how-it-functions">
                 See How It Functions
              </Link>
            </Button>
            </div>
        </div>

        <div className="conatiner mx-auto max-w-5xl overflow-hidden rounded-xl shadow-xl">
          <div className="gradient p-1 aspect-[16/9]">
            <Image 
              src="/splitify\public\logos\hero.png"
              width={1280}
              height={720}
              alt="Banner"
              className="rounded-lg mx-auto"
              priority
            />
          </div>
        </div>
      </section>

      <section id = "Mechanisms" className="bg-gray-50 py-20">

        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
            <Badge variant="outline" className="bg-red-200 text-red-600">
           Mechanisms
            </Badge>

          <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
              Easily manage and divide your expenses.
          </h2>

          <p className="mx-auto mt-3 max-w-[700px] text-gray-500 md:text-xl/relaxed">
              Get all the features you need to stay on top of shared expenses, all in one place.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-2">
            {FEATURES.map(({title, Icon, bg, color, description}) => (
              <Card 
                      key={title}
                      className="flex flex-col items-center space-y-4 p-6 text-center"
                  >
                <div className={`rounded-full p-3 ${bg}`}>
                  <Icon className={`h-6 w-6 $color{color}`} />
                </div>

                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-gray-500">{description}</p>
              </Card>
            ))}
          </div>

        </div>

      </section>

            <section id="how-it-functions" className="py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge variant="outline" className="bg-red-100 text-red-700">
            How It Functions
          </Badge>
          <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
           Smart, simple, and stress-free expense splitting.
          </h2>
          <p className="mx-auto mt-3 max-w-[700px] text-gray-500 md:text-xl/relaxed">
             Just a few easy steps to begin managing and sharing expenses with friends.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            {STEPS.map(({ label, title, description }) => (
              <div key={label} className="flex flex-col items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-600">
                  {label}
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-gray-500 text-center">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-red-50 py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge variant="outline" className="bg-red-100 text-red-700">
            Success Stories
          </Badge>
          <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
             What people think about us
          </h2>
          
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map(({ quote, name, role, image }) => (
               <Card key={name} className="flex flex-col justify-between">
                <CardContent className="space-y-4 p-6">
                  <p className="text-gray-500">{quote}</p>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      {/* Placeholder avatar */}
                      <AvatarImage src={image} alt={name} />
                      <AvatarFallback className="uppercase">
                        {name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-medium">{name}</p>
                      <p className="text-sm text-muted-foreground">{role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 gradient">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <h2 className="text-3xl font-extrabold-tight md:text-4xl text-white">
            Here to simplify how you share expenses ?
          </h2>

          <p className="mx-auto max-w-[600px] text-red-100md:text-xl/relaxed ">
          Trusted by thousands to make expense sharing effortless and clear.
            </p>
 
            <Button asChild size="lg" className="bg-red-800 hover:opacity-90">
                 <Link href="/dashboard">
                Let’s Go
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
        </div>
      </section>

      <footer className="border-t bg-violet-50 py-12 text-center text-sm text-muted-foreground">
        Developed with passion by RaoSahab
      </footer>

     </div>
  );
}

