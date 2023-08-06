Name: libbde
Version: 20151017
Release: 1
Summary: Library to access the BitLocker Drive Encryption (BDE) format
Group: System Environment/Libraries
License: LGPL
Source: %{name}-%{version}.tar.gz
URL: https://github.com/libyal/libbde/
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}-root-%(%{__id_u} -n)
Requires:         openssl         
BuildRequires:         openssl-devel         

%description
libbde is a library to access the BitLocker Drive Encryption (BDE) format

%package devel
Summary: Header files and libraries for developing applications for libbde
Group: Development/Libraries
Requires: libbde = %{version}-%{release}

%description devel
Header files and libraries for developing applications for libbde.

%package tools
Summary: Several tools for accessing BitLocker Drive Encryption volumes
Group: Applications/System
Requires: libbde = %{version}-%{release}  fuse-libs
BuildRequires:  fuse-devel

%description tools
Several tools for accessing the BitLocker Drive Encryption volumes

%package python
Summary: Python bindings for libbde
Group: System Environment/Libraries
Requires: libbde = %{version}-%{release} python
BuildRequires: python-devel

%description python
Python bindings for libbde

%prep
%setup -q

%build
%configure --prefix=/usr --libdir=%{_libdir} --mandir=%{_mandir} --enable-python
make %{?_smp_mflags}

%install
rm -rf ${RPM_BUILD_ROOT}
make DESTDIR=${RPM_BUILD_ROOT} install

%clean
rm -rf ${RPM_BUILD_ROOT}

%post -p /sbin/ldconfig

%postun -p /sbin/ldconfig

%files
%defattr(644,root,root,755)
%doc AUTHORS COPYING NEWS README
%attr(755,root,root) %{_libdir}/*.so.*

%files devel
%defattr(644,root,root,755)
%doc AUTHORS COPYING NEWS README ChangeLog
%{_libdir}/*.a
%{_libdir}/*.la
%{_libdir}/*.so
%{_libdir}/pkgconfig/libbde.pc
%{_includedir}/*
%{_mandir}/man3/*

%files tools
%defattr(644,root,root,755)
%doc AUTHORS COPYING NEWS README
%attr(755,root,root) %{_bindir}/bdeinfo
%attr(755,root,root) %{_bindir}/bdemount
%{_mandir}/man1/*

%files python
%defattr(644,root,root,755)
%doc AUTHORS COPYING NEWS README
%{_libdir}/python*/site-packages/*.a
%{_libdir}/python*/site-packages/*.la
%{_libdir}/python*/site-packages/*.so

%changelog
* Sat Oct 17 2015 Joachim Metz <joachim.metz@gmail.com> 20151017-1
- Auto-generated

