import Section from '@app/components/layout/Section';
import LinkContainer from '@app/components/LinkContainer';
import theme from '@app/styles/theme';
import { Checkbox, Group, Textarea, TextInput, VisuallyHidden, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FC, useEffect, useRef, useState } from 'react';
import EmailCopy from '../EmailCopy/EmailCopy';
import Typography from '@app/components/Typography/Typography';
import { gsap } from 'gsap';
import genCharArray from '@app/utils/genCharArray';
import {
  Button,
  ContactContainer,
  ContactLinkContainer,
  FormContainer,
  Letter,
  LettersLayer,
} from './styles';
import { useMedia } from '@app/hooks/useMedia';
import { Breakpoints } from '@app/styles/media';
import { IconLink } from '@app/types';

const links: IconLink[] = [{ type: 'instagram' }, { type: 'spotify' }, { type: 'youtube' }];

const LETTERS = [...genCharArray('a', 'z'), ...genCharArray('a', 'z'), ...genCharArray('a', 'z')];

const Contact: FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const letterRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const isDesktop = useMedia(Breakpoints.sm);

  useEffect(() => {
    if (isDesktop) {
      letterRefs.current.forEach((el, i) => {
        if (!el) return;
        const startX = Math.random() * window.innerWidth * 0.75;
        const startY = 25 - Math.random() * 80;
        // Random start point for each letter
        gsap.set(el, {
          x: startX,
          y: startY,
          rotation: Math.random() * 360,
          opacity: 1,
        });
        // "Swim" animation after the letters are in the bowl
        gsap.to(el, {
          duration: 3 + Math.random(),
          x: `+=${Math.random() * 50 - 10}`,
          y: `+=${Math.random() * 70 - 30}`,
          rotation: `+=${Math.random() * 30 - 15}`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }
  }, [isDesktop]);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
      gdpr: false,
    },

    validate: {
      name: (value) => (value.trim().length > 0 ? null : 'Name is required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      message: (value) =>
        value.trim().length > 10 ? null : 'Message must be at least 10 characters',
      gdpr: (value) => (value ? null : 'You must agree to the GDPR terms'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };
  return (
    <Section id="kontakt" $bgColor="#CAE8E9">
      <>
        <ContactContainer>
          <VisuallyHidden component={'h2'}>Kontakt</VisuallyHidden>
          <FormContainer onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Name"
              placeholder="Dein Name"
              {...form.getInputProps('name')}
              withAsterisk
              size="md"
              radius="md"
              key={form.key('name')}
            />
            <TextInput
              label="E-mail"
              placeholder="name@beispiel.com"
              {...form.getInputProps('email')}
              withAsterisk
              size="md"
              radius="md"
              key={form.key('email')}
            />
            <Textarea
              label="Nachricht"
              placeholder="Schreibe eine Nachricht..."
              minRows={4}
              autosize
              {...form.getInputProps('message')}
              withAsterisk
              size="md"
              radius="md"
            />
            <Checkbox
              style={{ maxWidth: '400px' }}
              color={theme.colors.fg.default}
              label="Ich bin damit einverstanden, dass diese Daten zum Zweck der Kontaktaufnahme gespeichert und verarbeitet werden. Mir ist bekannt, dass ich meine Einwilligung jederzeit widerrufen kann."
              {...form.getInputProps('gdpr', { type: 'checkbox' })}
            />
            <Group mt="md">
              <Button type="submit">Senden</Button>
            </Group>

            {status === 'sent' && (
              <Typography color={theme.colors.fg.default}>Message sent successfully!</Typography>
            )}
            {status === 'error' && (
              <Typography color="red">Something went wrong. Please try again.</Typography>
            )}
          </FormContainer>
          <Flex gap={'32px'} direction={'column'} align={{ base: 'center', sm: 'flex-start' }}>
            <Typography
              fontSize="20px"
              type="montserrat"
              color={theme.colors.accent.flamingo}
              fontWeight={600}
              as={'h3'}
            >
              Oder erreiche uns unter
            </Typography>
            <EmailCopy email="kontakt@buchstabensuppe-hörspiel.de" />
            <ContactLinkContainer iconLinks={links} />
          </Flex>
        </ContactContainer>
        <LettersLayer>
          {LETTERS.map((char, i) => (
            //@ts-ignore
            <Letter key={i} ref={(el) => (letterRefs.current[i] = el)} title={char}>
              {char}
            </Letter>
          ))}
        </LettersLayer>
      </>
    </Section>
  );
};

export default Contact;
