"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  image?: string;
  complete?: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, title, message, image, complete = false, onClose }: ModalProps) {
  
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const isMobile = windowWidth < 768;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              // backgroundColor: "#fff",
              backgroundImage: image ? `url(${image})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              imageRendering: "pixelated",
              padding: "2rem",
              borderRadius: "8px",
              // maxWidth: "90%",
              width: isMobile ? "280px" : "400px",
              height: isMobile ? "280px" : "400px",
              // width: "258px",
              // height: "258px",
              textAlign: "center",
            }}
          >
            <article style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              color: "#100d36",
              fontSize: isMobile ? "1.2rem" : "2rem",
              textShadow: `
              -1px -1px 0 #ffffff,  
              1px -1px 0 #ffffff,  
              -1px  1px 0 #ffffff,  
              1px  1px 0 #ffffff  
            `
            }}>
              {title && <h2>{title}</h2>}
              <p>{message}</p>
            </article>
            {complete ? (
              <button
                onClick={() => router.push("/")}
                style={{
                  position: "relative",
                  top: isMobile ? "40%" : "40%",
                  left: isMobile ? "20%" : "14%",
                  // top: "40%",
                  // left: "30%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: '#2d2871',
                  color: '#d3d2e9',
                  border: '2px solid #d3d2e9',
                  borderRadius: '0.25rem',
                  marginTop: "1rem",
                  padding: "0.5rem 1rem",
                  fontSize: isMobile ? "1.5rem" : "2rem",
                  cursor: "pointer",
                }}
              >
                Inicio
              </button>
            ) : (
              <button
                onClick={onClose}
                style={{
                  position: "relative",
                  top: isMobile ? "40%" : "40%",
                  left: isMobile ? "23%" : "16%",
                  // top: "40%",
                  // left: "30%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: '#2d2871',
                  color: '#d3d2e9',
                  border: '2px solid #d3d2e9',
                  borderRadius: '0.25rem',
                  marginTop: "1rem",
                  padding: "0.5rem 1rem",
                  fontSize: isMobile ? "1.5rem" : "2rem",
                  cursor: "pointer",
                }}
              >
                Fechar
              </button>
            )
            }

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
