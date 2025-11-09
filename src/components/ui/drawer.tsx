"use client";

import * as React from "react";

// Simple client-side only drawer wrapper
// This file should only be imported in client components that use dynamic import with ssr: false

// Type definitions for vaul components
type VaulRootProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  [key: string]: any;
};

type VaulContentProps = {
  children?: React.ReactNode;
  [key: string]: any;
};

type VaulTriggerProps = {
  asChild?: boolean;
  children?: React.ReactNode;
  [key: string]: any;
};

// Create components that safely handle SSR
const Drawer = React.forwardRef<HTMLDivElement, VaulRootProps>((props, ref) => {
  const [Vaul, setVaul] = React.useState<any>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      try {
        const vaul = require("vaul");
        setVaul(vaul);
      } catch {
        // Vaul not available
      }
    }
  }, []);

  if (!mounted || !Vaul) {
    // Return a hidden div during SSR or before vaul loads (never renders children)
    return <div ref={ref} style={{ display: "none" }} data-drawer-placeholder />;
  }

  const Component = Vaul.Root;
  return <Component {...props} ref={ref} />;
});
Drawer.displayName = "Drawer";

const DrawerPortal: React.FC<{ children?: React.ReactNode }> = (props) => {
  const [Vaul, setVaul] = React.useState<any>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      try {
        const vaul = require("vaul");
        setVaul(vaul);
      } catch {
        // Vaul not available
      }
    }
  }, []);

  if (!mounted || !Vaul) {
    return <>{props.children}</>;
  }

  const Component = Vaul.Portal;
  return <Component>{props.children}</Component>;
};

const DrawerOverlay = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const [Vaul, setVaul] = React.useState<any>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      try {
        const vaul = require("vaul");
        setVaul(vaul);
      } catch {
        // Vaul not available
      }
    }
  }, []);

  if (!mounted || !Vaul) {
    return <div ref={ref} {...props} style={{ display: "none" }} />;
  }

  const Component = Vaul.Drawer.Overlay;
  return <Component {...props} ref={ref} />;
});
DrawerOverlay.displayName = "DrawerOverlay";

const DrawerContent = React.forwardRef<HTMLDivElement, VaulContentProps>((props, ref) => {
  const [Vaul, setVaul] = React.useState<any>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      try {
        const vaul = require("vaul");
        setVaul(vaul);
      } catch {
        // Vaul not available
      }
    }
  }, []);

  if (!mounted || !Vaul) {
    return <div ref={ref} {...props} style={{ display: "none" }} />;
  }

  const Component = Vaul.Drawer.Content;
  return <Component {...props} ref={ref} />;
});
DrawerContent.displayName = "DrawerContent";

const DrawerTrigger = React.forwardRef<HTMLButtonElement, VaulTriggerProps>((props, ref) => {
  const [Vaul, setVaul] = React.useState<any>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      try {
        const vaul = require("vaul");
        setVaul(vaul);
      } catch {
        // Vaul not available
      }
    }
  }, []);

  // Always render a button, even during SSR
  if (!mounted || !Vaul || !Vaul.Drawer?.Trigger) {
    return <button ref={ref} {...props} />;
  }

  const Component = Vaul.Drawer.Trigger;
  return <Component {...props} ref={ref} />;
});
DrawerTrigger.displayName = "DrawerTrigger";

const DrawerClose = React.forwardRef<HTMLButtonElement, any>((props, ref) => {
  const [Vaul, setVaul] = React.useState<any>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      try {
        const vaul = require("vaul");
        setVaul(vaul);
      } catch {
        // Vaul not available
      }
    }
  }, []);

  if (!mounted || !Vaul || !Vaul.Drawer?.Close) {
    return <button ref={ref} {...props} />;
  }

  const Component = Vaul.Drawer.Close;
  return <Component {...props} ref={ref} />;
});
DrawerClose.displayName = "DrawerClose";

const DrawerTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => {
  const [Vaul, setVaul] = React.useState<any>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      try {
        const vaul = require("vaul");
        setVaul(vaul);
      } catch {
        // Vaul not available
      }
    }
  }, []);

  if (!mounted || !Vaul || !Vaul.Drawer?.Title) {
    return <h2 {...props} />;
  }

  const Component = Vaul.Drawer.Title;
  return <Component {...props} />;
};

const DrawerDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = (props) => {
  const [Vaul, setVaul] = React.useState<any>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      try {
        const vaul = require("vaul");
        setVaul(vaul);
      } catch {
        // Vaul not available
      }
    }
  }, []);

  if (!mounted || !Vaul || !Vaul.Drawer?.Description) {
    return <p {...props} />;
  }

  const Component = Vaul.Drawer.Description;
  return <Component {...props} />;
};

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex flex-col space-y-2 text-center sm:text-left ${className || ""}`}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className || ""}`}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
