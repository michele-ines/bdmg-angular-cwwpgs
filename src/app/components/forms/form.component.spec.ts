import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { States } from 'src/app/models/enums/states.enum';
import { ViaCepService } from 'src/app/services/via-cep.service';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let viacepService: jasmine.SpyObj<ViaCepService>;

  beforeEach(async () => {
    const viacepSpy = jasmine.createSpyObj('ViaCepService', ['getEndereco']);

    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      providers: [FormBuilder, { provide: ViaCepService, useValue: viacepSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    viacepService = TestBed.inject(
      ViaCepService
    ) as jasmine.SpyObj<ViaCepService>;
  });

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.initForm();

    expect(component.enderecoForm).toBeDefined();
    expect(component.isDisabled).toEqual(true);
    expect(component.estadoSuggestions).toEqual(Object.values(States));

    const formControls = component.enderecoForm.controls;

    expect(formControls['cep']).toBeDefined();
    expect(formControls['logradouro']).toBeDefined();
    expect(formControls['complemento']).toBeDefined();
    expect(formControls['bairro']).toBeDefined();
    expect(formControls['cidade']).toBeDefined();
    expect(formControls['state']).toBeDefined();
    expect(formControls['ibge']).toBeDefined();
    expect(formControls['siafi']).toBeDefined();
  });

  it('should clear the specified control', () => {
    const controlName = 'cep';
    component.enderecoForm.controls[controlName].setValue('12345678');
    component.clear(controlName);
    expect(component.enderecoForm.controls[controlName].value).toBe('');
  });

  it('should save the address to localStorage', () => {
    const endereco = {
      cep: '12345678',
      logradouro: 'Rua Teste',
      complemento: '123.456',
      bairro: 'Bairro Teste',
      cidade: 'Cidade Teste',
      state: 'SP',
      ibge: '',
      siafi: '',
    };

    component.enderecoForm.setValue(endereco);
    component.salvar();

    const savedEndereco = localStorage.getItem('endereco');
    expect(savedEndereco).toBe(JSON.stringify(endereco));
  });

  it('should call the viacepService to get the address', () => {
    const cepControl = component.enderecoForm.get('cep');
    cepControl?.setValue('12345678');
    const cep = cepControl?.value;

    const mockAddress = {
      cep: '12345678',
      logradouro: 'Rua Teste',
      complemento: '123.456',
      bairro: 'Bairro Teste',
      cidade: 'Cidade Teste',
      state: 'SP',
      ibge: '',
      siafi: '',
    };

    viacepService.getEndereco.and.returnValue(of(mockAddress));

    component.buscarEndereco();
    expect(viacepService.getEndereco).toHaveBeenCalledWith(cep);
    expect(component.enderecoForm.value).toEqual(mockAddress);
  });

  it('should handle errors when fetching the address', () => {
    const cepControl = component.enderecoForm.get('cep');
    cepControl?.setValue('12345678');
    const cep = cepControl?.value;

    const mockError = { error: 'Erro ao buscar endereço' };

    viacepService.getEndereco.and.returnValue(throwError(mockError));

    spyOn(console, 'error');

    component.buscarEndereco();
    expect(viacepService.getEndereco).toHaveBeenCalledWith(cep);
    expect(console.error).toHaveBeenCalledWith(
      'Ocorreu um erro ao buscar o endereço.',
      mockError
    );
  });
});
