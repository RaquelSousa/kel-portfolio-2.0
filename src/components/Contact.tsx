import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@kel/ui-components";
import { Button } from "@kel/ui-components";
import { Input } from "@kel/ui-components";
import { Textarea } from "@kel/ui-components";
import { Badge } from "@kel/ui-components";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";

export function Contact() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const { submit, isSubmitting } = useFormSubmission<ContactFormData>({
    onSubmit: async (data) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form data:", data);
    },
    onSuccess: () => {
      form.reset();
    },
    successMessage:
      "Thank you for your interest. I'll get back to you within 24 hours.",
    errorMessage: "Please try again later or contact me directly via email.",
  });

  const { handleSubmit } = form;

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to discuss your next project? I'm always excited to explore
              new opportunities and collaborate with innovative teams.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Card className="border-0 shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">Get In Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <Badge className="mb-4">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                      Available for new opportunities
                    </Badge>
                    <p className="text-muted-foreground leading-relaxed">
                      I'm currently seeking senior frontend roles where I can
                      leverage my React/TypeScript expertise to drive technical
                      excellence and mentor development teams.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">
                          Belfast/Lurgan, Northern Ireland
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <a
                          href="mailto:raquel.sousa.wt@gmail.com"
                          className="text-sm text-primary hover:underline"
                          aria-label="Send email to Raquel Sousa at raquel.sousa.wt@gmail.com"
                        >
                          raquel.sousa.wt@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Phone</p>
                        <a
                          href="tel:+447506433613"
                          className="text-sm text-primary hover:underline"
                          aria-label="Call Raquel Sousa at +44 7506 433613"
                        >
                          +44 7506 433613
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border/50">
                    <p className="text-sm text-muted-foreground mb-4">
                      Connect with me online:
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href="https://github.com/RaquelSousa"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View Raquel Sousa's GitHub profile (opens in new tab)"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href="https://www.linkedin.com/in/raquel-sousa-frontend-developer/"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View Raquel Sousa's LinkedIn profile (opens in new tab)"
                        >
                          <Linkedin className="mr-2 h-4 w-4" />
                          LinkedIn
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      Let's build something exceptional together
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Whether you're looking for a senior developer to lead your
                      frontend initiatives or need an experienced mentor for
                      your development team, I'm here to help drive your
                      technical vision forward.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Card className="border-0 shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">Send a Message</CardTitle>
                  <CardDescription>
                    I'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={handleSubmit(submit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="John Doe" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Your Company" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="john@company.com"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Tell me about your project, role, or how I can help..."
                                rows={6}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        aria-describedby={
                          isSubmitting ? "form-loading-message" : undefined
                        }
                      >
                        {isSubmitting ? (
                          <>
                            <span className="sr-only" id="form-loading-message">
                              Sending your message, please wait
                            </span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
