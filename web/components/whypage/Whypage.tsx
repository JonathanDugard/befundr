import React from 'react';
import Divider from '../z-library/display elements/Divider';

type Props = {};

const Whypage = (props: Props) => {
  return (
    <div className="flex flex-col items-start justify-start gap-10 w-full">
      <h1 className="textStyle-title">Why beFundr ?</h1>
      <h2 className="textStyle-headline -mt-10">
        Depending on your role on the platform, discover why beFundr make the
        crowdfunding better
      </h2>
      <h3 className="textStyle-subtitle -mb-10">
        As <strong className="!text-accent">founder, ean more</strong> if you
        drive well your project{' '}
      </h3>
      <Divider />
      <p className="textStyle-body mb-10">
        Sed feugiat. Cum sociis natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus. Ut pellentesque augue sed urna.
        Vestibulum diam eros, fringilla et, consectetuer eu, nonummy id, sapien.
        Nullam at lectus. In sagittis ultrices mauris. Curabitur malesuada erat
        sit amet massa. Fusce blandit. Aliquam erat volutpat. Aliquam euismod.
        Aenean vel lectus. Nunc imperdiet justo nec dolor. <br />
        Nam quis ante. Nullam interdum quam in eros. Sed eleifend libero eu
        tellus consequat fermentum. Nullam pellentesque risus ut augue.
        Vestibulum eu tellus. Integer eleifend suscipit urna. Fusce porttitor
        leo et odio. Vivamus vehicula justo a nisl. In rutrum, purus ut dictum
        auctor, dolor velit accumsan dolor, eu convallis augue dui ac lectus.
        Nullam eleifend pellentesque ligula. Nam quis magna. Donec elementum
        dapibus erat. Pellentesque vel ipsum nec orci fermentum accumsan. Nunc
        porta magna eu neque. Nam id erat eu mi aliquet cursus. Morbi ut felis.
        Vestibulum in ipsum. <br />
        Integer ac diam. Nullam porttitor dolor eget metus. Nulla sed metus quis
        tortor lacinia tempor. Mauris mauris dui, faucibus vitae, aliquet sit
        amet, placerat a, ante. Nunc placerat tincidunt neque. Mauris egestas
        dolor ut ipsum cursus malesuada. Curabitur odio. Nunc lobortis. Sed
        mattis tempor felis. Mauris dolor quam, facilisis at, bibendum sit amet,
        rutrum ornare, pede. Suspendisse accumsan sagittis velit. Pellentesque
        varius laoreet lorem. Vivamus egestas sapien id diam.
      </p>
      <h3 className="textStyle-subtitle -mb-10">
        As <strong className="!text-accent">contributor</strong> invest in{' '}
        <strong className="!text-accent">security</strong>
      </h3>
      <Divider />
      <p className="textStyle-body">
        Sed feugiat. Cum sociis natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus. Ut pellentesque augue sed urna.
        Vestibulum diam eros, fringilla et, consectetuer eu, nonummy id, sapien.
        Nullam at lectus. In sagittis ultrices mauris. Curabitur malesuada erat
        sit amet massa. Fusce blandit. Aliquam erat volutpat. Aliquam euismod.
        Aenean vel lectus. Nunc imperdiet justo nec dolor. <br />
        Nam quis ante. Nullam interdum quam in eros. Sed eleifend libero eu
        tellus consequat fermentum. Nullam pellentesque risus ut augue.
        Vestibulum eu tellus. Integer eleifend suscipit urna. Fusce porttitor
        leo et odio. Vivamus vehicula justo a nisl. In rutrum, purus ut dictum
        auctor, dolor velit accumsan dolor, eu convallis augue dui ac lectus.
        Nullam eleifend pellentesque ligula. Nam quis magna. Donec elementum
        dapibus erat. Pellentesque vel ipsum nec orci fermentum accumsan. Nunc
        porta magna eu neque. Nam id erat eu mi aliquet cursus. Morbi ut felis.
        Vestibulum in ipsum. <br />
        Integer ac diam. Nullam porttitor dolor eget metus. Nulla sed metus quis
        tortor lacinia tempor. Mauris mauris dui, faucibus vitae, aliquet sit
        amet, placerat a, ante. Nunc placerat tincidunt neque. Mauris egestas
        dolor ut ipsum cursus malesuada. Curabitur odio. Nunc lobortis. Sed
        mattis tempor felis. Mauris dolor quam, facilisis at, bibendum sit amet,
        rutrum ornare, pede. Suspendisse accumsan sagittis velit. Pellentesque
        varius laoreet lorem. Vivamus egestas sapien id diam.
      </p>
    </div>
  );
};

export default Whypage;
