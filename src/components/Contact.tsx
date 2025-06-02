import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { sendContactEmail } from "@/lib/email";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "kel-ui-components";
import { Button } from "kel-ui-components";
import { Input } from "kel-ui-components";
import { Textarea } from "kel-ui-components";
import { Badge } from "kel-ui-components";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  Loader2,
} from "lucide-react";

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
      await sendContactEmail(data);
    },
    onSuccess: () => {
      form.reset();
    },
    successMessage:
      "Thank you for your message! I'll get back to you within 24 hours.",
    errorMessage:
      "Sorry, there was an error sending your message. Please try again or contact me directly via email.",
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
                  <CardDescription>
                    I'm always open to discussing new opportunities and
                    interesting projects. Feel free to reach out!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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

                  <div className="border-t pt-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      Find me on social media
                    </p>
                    <div className="flex gap-3">
                      <a
                        href="https://github.com/kellykel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                        aria-label="Visit GitHub profile"
                      >
                        <Github className="h-4 w-4 text-primary" />
                      </a>
                      <a
                        href="https://linkedin.com/in/raquel-sousa-w"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                        aria-label="Visit LinkedIn profile"
                      >
                        <Linkedin className="h-4 w-4 text-primary" />
                      </a>
                    </div>
                  </div>

                  <div className="border border-dashed border-muted rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Response Time:</strong> I typically respond to
                      emails within 24 hours during business days. For urgent
                      matters, please call directly.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Badge variant="secondary" className="mr-2">
                      Open to Work
                    </Badge>
                    <Badge variant="outline">Remote Friendly</Badge>
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
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
