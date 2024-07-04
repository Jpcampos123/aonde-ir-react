// app/profile/page.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';

const ProfilePage = () => {
  const [name, setName] = useState('Rafaella');
  const [email, setEmail] = useState('Rafaellacostasales@hotmail.com');
  const [phone, setPhone] = useState('123456');
  const [accountType, setAccountType] = useState('convidado');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  return (
    <div className="p-4">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6 px-4">
        <div className="flex items-center space-x-4">
          <div className="rounded-full overflow-hidden w-12 h-12">
            <Image
              src="https://cdn.quasar.dev/img/avatar.png"
              alt="Profile Photo"
              width={50}
              height={50}
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-black font-bold text-lg">{name}</h2>
            <div className="flex items-center space-x-2">
              <span>{accountType}</span>
              <Image
                src="/logout-icon.png"
                alt="Logout"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        <Image
          src="/more_horiz-icon.png"
          alt="More Options"
          width={22}
          height={22}
          className="cursor-pointer"
        />
      </div>

      {/* Input Section */}
      <div className="my-10 flex flex-col space-y-4">
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="border-2 border-red-900 text-red-900 px-4 py-2 rounded"
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="border-2 border-red-900 text-red-900 px-4 py-2 rounded"
          placeholder="Email"
        />
        <input
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          className="border-2 border-red-900 text-red-900 px-4 py-2 rounded"
          placeholder="Phone"
        />
      </div>

      {/* Account Type Section */}
      <div className="flex justify-between items-center p-4">
        <div className="flex flex-col">
          <h2 className="font-bold text-xl mb-4">Tipo de Conta</h2>
          <div className="flex flex-col space-y-2">
  <label className="flex items-center">
    <input
      type="radio"
      value="convidado"
      checked={accountType === 'convidado'}
      onChange={() => setAccountType('convidado')}
      className="form-radio h-5 w-5 text-red-600 border-2 border-red-600 rounded-full focus:ring-red-600"
    />
    <span className="ml-2">Convidado</span>
  </label>
  <label className="flex items-center">
    <input
      type="radio"
      value="empresa"
      checked={accountType === 'empresa'}
      onChange={() => setAccountType('empresa')}
      id="Yellow"
      className="form-radio h-5 w-5 text-red-600 border-2 border-red-600 rounded-full focus:ring-red-600"
    />
    <span className="ml-2">Empresa</span>
  </label>
</div>

        </div>
        <div className="flex items-center">
          <h2 className="font-bold text-xl mr-2">Editar foto</h2>
          <Image
            src="/edit-icon.png"
            alt="Edit"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
