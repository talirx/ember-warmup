import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { auth } from './firebase'

export type AuthResult =
  | { ok: true; user: User }
  | { ok: false; error: string }

function friendly(err: unknown): string {
  const code = (err as { code?: string })?.code ?? ''
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Correo o contraseña incorrectos.'
    case 'auth/invalid-email':
      return 'Correo no válido.'
    case 'auth/email-already-in-use':
      return 'Ese correo ya está registrado. Inicia sesión.'
    case 'auth/weak-password':
      return 'Contraseña muy corta (mínimo 6 caracteres).'
    case 'auth/popup-closed-by-user':
      return 'Ventana de Google cerrada.'
    case 'auth/unauthorized-domain':
      return 'Dominio no autorizado para Google Sign-in (pendiente de configurar).'
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Espera un momento.'
    case 'auth/network-request-failed':
      return 'Sin conexión. Reintenta.'
    default:
      return 'Error de autenticación. Inténtalo de nuevo.'
  }
}

export async function signUpEmail(email: string, password: string): Promise<AuthResult> {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    return { ok: true, user: cred.user }
  } catch (e) {
    return { ok: false, error: friendly(e) }
  }
}

export async function signInEmail(email: string, password: string): Promise<AuthResult> {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    return { ok: true, user: cred.user }
  } catch (e) {
    return { ok: false, error: friendly(e) }
  }
}

export async function signInGoogle(): Promise<AuthResult> {
  try {
    const provider = new GoogleAuthProvider()
    const cred = await signInWithPopup(auth, provider)
    return { ok: true, user: cred.user }
  } catch (e) {
    return { ok: false, error: friendly(e) }
  }
}

export async function logout(): Promise<void> {
  await signOut(auth)
}

export function onAuthChange(cb: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, cb)
}
