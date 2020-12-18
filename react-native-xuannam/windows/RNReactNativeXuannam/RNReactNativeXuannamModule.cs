using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace React.Native.Xuannam.RNReactNativeXuannam
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNReactNativeXuannamModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNReactNativeXuannamModule"/>.
        /// </summary>
        internal RNReactNativeXuannamModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNReactNativeXuannam";
            }
        }
    }
}
