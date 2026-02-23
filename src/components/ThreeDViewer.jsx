import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, useTexture, Center } from '@react-three/drei';
import * as THREE from 'three';

const TshirtModel = ({ product, onCompleteRotation }) => {
  const meshRef = useRef();
  
  // Load both front and back textures
  const frontTexture = useTexture(product.image || 'https://via.placeholder.com/400x600/FFFFFF/000000?text=JJ+WEAR+FRONT');
  const backTexture = useTexture(product.backImage || product.image || 'https://via.placeholder.com/400x600/FFFFFF/000000?text=JJ+WEAR+BACK');

  // Flip the back texture horizontally so it looks correct on the back face
  useEffect(() => {
    if (backTexture) {
      backTexture.repeat.set(-1, 1);
      backTexture.offset.set(1, 0);
    }
  }, [backTexture]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const prevRotation = meshRef.current.rotation.y;
      meshRef.current.rotation.y += delta * 0.8; // Slightly faster rotation
      const newRotation = meshRef.current.rotation.y;

      // Check if we just completed a full rotation (passed a multiple of 2 * PI)
      const prevCircle = Math.floor(prevRotation / (Math.PI * 2));
      const newCircle = Math.floor(newRotation / (Math.PI * 2));

      if (newCircle > prevCircle) {
        onCompleteRotation();
      }
    }
  });

  return (
    <Center top>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[1, 1.4, 0.05]} />
        <meshStandardMaterial attach="material-0" color="#f8f8f8" /> {/* right */}
        <meshStandardMaterial attach="material-1" color="#f8f8f8" /> {/* left */}
        <meshStandardMaterial attach="material-2" color="#f8f8f8" /> {/* top */}
        <meshStandardMaterial attach="material-3" color="#f8f8f8" /> {/* bottom */}
        <meshStandardMaterial attach="material-4" map={frontTexture} /> {/* front */}
        <meshStandardMaterial attach="material-5" map={backTexture} /> {/* back */}
      </mesh>
    </Center>
  );
};

const ThreeDViewer = ({ products = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleRotationComplete = () => {
    if (products.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }
  };

  const activeProduct = products[currentIndex];

  if (!activeProduct) return null;

  return (
    <div style={{ height: '500px', width: '100%', cursor: 'grab' }}>
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} contactShadow={{ opacity: 0.4, blur: 2 }}>
            <TshirtModel 
              key={activeProduct.id} // Re-mount when product changes to reload textures correctly
              product={activeProduct} 
              onCompleteRotation={handleRotationComplete}
            />
          </Stage>
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate={false} 
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      <div style={{ 
        textAlign: 'center', 
        marginTop: '10px', 
        color: '#fff', 
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '2px',
        fontSize: '0.8rem'
      }}>
        {activeProduct.collection} / {activeProduct.name}
      </div>
    </div>
  );
};

export default ThreeDViewer;


